import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../features";
import ApartmentEditSlice from "../features/apartment/ApartmentEditSlice";
import ApartmentSlice from "../features/apartment/ApartmentSlice";
import FilterSlice from "../features/filter/FilterSlice";
import NewsSlice from "../features/news/NewsSlice";
import ProjectSlice from "../features/project/ProjectSlice";
import CommercialStoreSlice from "../features/commercialStore/CommercialStoreSlice";
import GallerySlice from "../features/gallery/GallerySlice";
import WishlistSlice from "../features/wishList/WishlistSlice";

export const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice,
    ApartmentEditSlice: ApartmentEditSlice,
    ApartmentSlice: ApartmentSlice,
    FilterSlice: FilterSlice,
    NewsSlice: NewsSlice,
    ProjectSlice: ProjectSlice,
    CommercialStoreSlice: CommercialStoreSlice,
    GallerySlice: GallerySlice,
    WishlistSlice: WishlistSlice,
  },
});
