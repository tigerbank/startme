export interface FeedbackItemProps {
  id: string;
  email: string;
  feedbackText: string;
}

export type TodoProps = {
  id: number;
  item: string;
};

export type EventProps = {
  id: number;
  name: string;
  detail: string;
};

export type NavProps = {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  subnav: any;
};

export type PageProps = {
  title: string;
  body: string;
  contentSections: any;
};

export type RestaurantProps = {
  id: number;
  name: string;
  location: string;
  detail: string;
  main_image: any;
};

export type BoxCarouselProps = {
  id: number;
  title: string;
  BoxCarouselDetail: any;
};

export type BoxCarouselDetailProps = {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  url: string;
};

export type StoreContextState = {
  darkMode: any;
  cart: any;
  user: any;
};

export type LoginInfoProps = {
  identifier: string;
  password: string;
};

export type RegisterInfoProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export interface OrderProps {
  id: number;
  paymentMethod: string;
  user: UserProps;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: null;
  deliveredAt: null;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  shippingAddress: ShippingAddressProps;
  orderItems: OrderItemProps[];
}

export interface OrderItemProps {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddressProps {
  id: number;
  fullName: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface UserProps {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  brands: BrandProps;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  image: any;
  localizations: any[];
}

export interface BrandProps {
  id: number;
  name: string;
}

export interface CartProps {
  cartItems: CartItemProps[];
  shippingAddress: ShippingAddressProps;
  paymentMethod: string;
}

export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  countInStock: number;
  quantity: number;
}

export interface JobProps {
  id: number;
  position: string;
  type: string;
  location: LocationProps;
  company: CompanyProps;
  locale: string;
  updated_at: Date;
}

export interface CompanyProps {
  id: number;
  name: string;
  locale: string;
  logo: any;
}

export interface LocationProps {
  id: number;
  name: string;
}

export interface PropertyProps {
  name: string;
  property_slug: string;
  type: string;
  listType: string;
  address: string;
  price: string;
  shortDetail: string;
  fullDetail: string;
  bedRoom: number;
  bathRoom: number;
  carPark: number;
}

export interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  noOfAllPosts: number;
}
