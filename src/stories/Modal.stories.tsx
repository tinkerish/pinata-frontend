import type { Meta, StoryObj } from "@storybook/react";

import ModalComponent from "../components/Modal";
import { useCallback, useState } from "react";

const meta: Meta<typeof ModalComponent> = {
  component: ModalComponent,
  title: "Modal",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalComponent>;

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const openModal = useCallback(() => {
    setButtonRef(document.activeElement as HTMLButtonElement);
    setShowModal(true);
  }, []);
  const closeModal = useCallback(() => {
    buttonRef?.focus();
    setShowModal(false);
  }, [buttonRef]);
  return (
    <div className="">
      <ModalComponent
        containerClassName="#storybook-root"
        onClose={closeModal}
        show={showModal}
        title=" Modal Component"
        actionButtonName="Save"
      >
        <p>Modal body</p>
      </ModalComponent>
      <button
        onClick={openModal}
        className="focus:border focus:border-black focus:border-solid"
      >
        Open Modal
      </button>
    </div>
  );
};

export const ModalStory: Story = {
  name: "Modal",
  render: () => <Modal />,
};
