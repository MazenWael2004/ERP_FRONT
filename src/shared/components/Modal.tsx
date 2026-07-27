import { Modal } from "@mantine/core";

interface AppModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: string;
}

function AppModal({
  opened,
  onClose,
  title,
  children,
  size = "lg",
}: AppModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={size}
      closeOnClickOutside={true}
    >
      {children}
    </Modal>
  );
}

export default AppModal;