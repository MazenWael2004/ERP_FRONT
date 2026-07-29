import { Modal } from "@mantine/core";



function AppModal({
  opened,
  onClose,
  title,
  children,
  size = "lg",
}) {
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