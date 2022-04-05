import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type ActionDialogProps = {
  name: String;
  prompt: String;
  submitButtonText: String;
  errorText: String;
  open: boolean;
  loading: boolean;
  handleSubmit: () => Promise<void>;
  toggleDialog: () => void;
  children?: JSX.Element | JSX.Element[];
};
const ActionDialog = ({
  name,
  prompt,
  submitButtonText,
  errorText,
  open,
  loading,
  handleSubmit,
  toggleDialog,
  children,
}: ActionDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      aria-labelledby="join-cup"
      aria-describedby="join-cup"
    >
      <DialogContent
        style={{
          backgroundColor: "#13172C",
          borderRadius: "25px",
          border: "3px solid #fff",
        }}
      >
        <DialogContentText
          style={{
            backgroundColor: "#13172C",
            fontFamily: "Space Mono",
            fontWeight: "800",
            fontSize: "24px",
            color: "#FFFFFF",
          }}
          id="alert-dialog-title"
        >
          {name}
        </DialogContentText>
        <DialogContentText
          style={{
            marginTop: "20px",
            fontFamily: "Space Mono",
            fontStyle: "italic",
            fontWeight: "400",
            fontSize: "20px",
            color: "#FFFFFF",
          }}
          id="join-cup-description"
        >
          {prompt}
        </DialogContentText>
        {children}
        <DialogContentText
          style={{
            marginTop: "10px",
            fontFamily: "Space Mono",
            fontStyle: "italic",
            fontWeight: "400",
            fontSize: "20px",
            color: "red",
          }}
          id="join-cup-error"
        >
          {errorText ? errorText : "ㅤ"}
        </DialogContentText>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                style={{
                  background: "#1C2730",
                  fontFamily: "Space Mono",
                  fontSize: 20,
                  borderRadius: 60,
                  fontWeight: 700,
                  height: 50,
                  padding: 10,
                  width: 242,
                  color: "white",
                }}
                onClick={toggleDialog}
              >
                cancel
              </Button>
              <div style={{ width: "20px" }} />
              <Button
                style={{
                  background: "#2F3869",
                  fontFamily: "Space Mono",
                  fontSize: 20,
                  borderRadius: 60,
                  fontWeight: 700,
                  height: 50,
                  padding: 10,
                  width: 242,
                  color: "white",
                }}
                onClick={handleSubmit}
                autoFocus
              >
                {submitButtonText}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ActionDialog;
