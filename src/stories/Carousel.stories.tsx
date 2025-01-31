import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "../components/Carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "Carousel",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const CarouselImage = () => {
  return (
    <div className="">
      <Carousel />
    </div>
  );
};

export const CarouselImageStory: Story = {
  name: "CarouselImageStory",
  render: () => <CarouselImage />,
};
