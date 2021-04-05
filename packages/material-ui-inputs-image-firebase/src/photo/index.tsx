import React, {FC, Fragment, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {useFormikContext} from "formik";
import {FormattedMessage} from "react-intl";
import path from "path";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import firebase from "@trejgun/firebase";
import {TextInput} from "@trejgun/material-ui-inputs-core";
import {ProgressOverlay} from "@trejgun/material-ui-progress";
import {ConfirmationDialog} from "@trejgun/material-ui-dialog-confirmation";
import {FirebaseFileInput} from "@trejgun/material-ui-inputs-file-firebase";

import {popup} from "../popup";
import {useStyles} from "./styles";

interface IPhotoInputProps {
  name: string;
  accept?: string | string[];
}

export const PhotoInput: FC<IPhotoInputProps> = props => {
  const {name, accept} = props;

  const classes = useStyles();
  const formik = useFormikContext<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteImageDialogOpen, setIsDeleteImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOptionDelete = (index: number): (() => void) => {
    return (): void => {
      setSelectedImageIndex(index);
      setIsDeleteImageDialogOpen(true);
    };
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    const newValue = formik.values[name];
    const [deleted] = newValue.splice(selectedImageIndex, 1);
    const fileName = path.basename(new URL(deleted.imageUrl).pathname);
    const storageRef = firebase.storage().ref();

    await storageRef
      .child(fileName)
      .delete()
      .catch(e => {
        console.error("Can't delete file:", e);
        if (e.code !== "storage/object-not-found") {
          throw e;
        }
      });
    formik.setFieldValue(name, newValue);
    setIsDeleteImageDialogOpen(false);
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteImageDialogOpen(false);
  };

  const handleFileChange = (urls: Array<string>): void => {
    setIsLoading(true);
    const newValue = formik.values[name];
    urls.forEach(imageUrl => {
      newValue.push({
        imageUrl,
        title: "",
      });
    });
    formik.setFieldValue(name, newValue);
    setIsLoading(false);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setIsLoading(true);

    const newValue = formik.values[name];
    const [removed] = newValue.splice(result.source.index, 1);
    newValue.splice(result.destination.index, 0, removed);

    formik.setFieldValue(name, newValue);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <Typography>
        <FormattedMessage id={`form.labels.${name}`} />
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {provided => (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className={classes.images}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Grid item>
                <ProgressOverlay isLoading={isLoading}>
                  <FirebaseFileInput onChange={handleFileChange} classes={{root: classes.media}} accept={accept} />
                </ProgressOverlay>
              </Grid>
              {formik.values[name].map((option: {imageUrl: string; title: string}, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {provided => (
                    <Grid item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card>
                        <CardMedia image={option.imageUrl} onClick={popup(option.imageUrl)} className={classes.media} />
                        <CardContent>
                          <TextInput name={`${name}[${i}].title`} value={option.title} />
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={handleOptionDelete(i)}>
                            <FormattedMessage id="form.buttons.delete" />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmationDialog open={isDeleteImageDialogOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <FormattedMessage id="dialogs.delete" values={formik.values[name][selectedImageIndex]} />
      </ConfirmationDialog>
    </Fragment>
  );
};
