import {useContext} from "react";
import {useSnackbar} from "notistack";
import {useIntl} from "react-intl";

import {IApiContext, IAuth, ApiContext} from "@trejgun/provider-api";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeleteUrl = () => {
  const api = useContext<IApiContext<IAuth>>(ApiContext);

  const {enqueueSnackbar} = useSnackbar();
  const {formatMessage} = useIntl();

  return async (url: string) => {
    return await api
      .fetch({
        url: "/s3/delete",
        data: {
          objectName: url.split("/").pop(),
        },
      })
      .then(data => {
        // eslint-disable-next-line no-console
        console.log("data", data);
        enqueueSnackbar(formatMessage({id: "snackbar.deleted"}), {variant: "success"});
      })
      .catch(error => {
        console.error("error", error);
        enqueueSnackbar(formatMessage({id: "snackbar.error"}), {variant: "error"});
      });
  };
};
