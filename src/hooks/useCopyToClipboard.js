import useDialog from './useDialog';

export const useCopyToClipboard = () => {
  const { showAlertDialog } = useDialog();
  const copy = async (text) => {
    if (!navigator?.clipboard) {
      showAlertDialog({
        title: 'Copy Failed',
        body: 'Navigator not support',
        acceptLabel: 'Cancel',
      });
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      showAlertDialog('Copy Success');
      showAlertDialog({
        title: 'Copy Success',
        body: text,
        acceptLabel: 'Close',
      });
      return true;
    } catch (error) {
      showAlertDialog({
        title: 'Copy Failed',
        body: error,
        acceptLabel: 'Cancel',
      });

      return false;
    }
  };

  return { copy };
};
