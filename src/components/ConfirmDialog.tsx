import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import type { MessageKey } from "../i18n/messages";

export const ConfirmDialog: React.FC<{
  readonly open: boolean;
  readonly titleId: MessageKey;
  readonly bodyId: MessageKey;
  readonly confirmId: MessageKey;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}> = ({ open, titleId, bodyId, confirmId, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <FormattedMessage id={titleId} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id={bodyId} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage id="progress.cancel" defaultMessage="Cancel" />
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          <FormattedMessage id={confirmId} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
