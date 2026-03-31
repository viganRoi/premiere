import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Gallery = () => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={264}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const itemData = [
  {
    img: "./images/f1.jpg",
    title: "apartment1",
  },
  {
    img: "./images/f2.jpg",
    title: "apartment2",
  },
  {
    img: "./images/f3.jpg",
    title: "apartment3",
  },
  {
    img: "./images/f4.jpg",
    title: "apartment4",
  },
];

export default Gallery;
