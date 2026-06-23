import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

export const FlourTipsDialog: React.FC<{
  readonly open: boolean;
  readonly tips: readonly string[];
  readonly onClose: () => void;
}> = ({ open, tips, onClose }) => {
  const { formatMessage } = useIntl();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <FormattedMessage id="tips.heading" defaultMessage="Empfohlene Mehlsorten:" />
      </DialogTitle>
      <DialogContent>
        <List dense sx={{ p: 0 }}>
          {tips.map((tip) => (
            <ListItem key={tip} sx={{ p: "2px 0" }}>
              <ListItemText primary={formatMessage({ id: "tips.item" }, { tip })} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage id="tips.close" defaultMessage="Close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
