import { Label, Room, EmojiEmotions } from "@material-ui/icons";

const shareIcon = [
  { id: Math.random() - 1, text: "Tag", Icon: Room, color: "blue" },
  {
    id: Math.random() - 1,
    text: "Feelings",
    Icon: EmojiEmotions,
    color: "orange",
  },
  { id: Math.random() - 1, text: "Location", Icon: Label, color: "green" },
];

export default shareIcon;
