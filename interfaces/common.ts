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
  title: string;
  slug: string;
  page: any;
  url: string;
  order: number;
};

export type PageProps = {
  title: string;
  body: string;
};

export type RestaurantProps = {
  id: number;
  name: string;
  location: string;
  detail: string;
  main_image: any;
};
