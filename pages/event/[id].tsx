import React from 'react';
import { buildEventPath, extractEvent } from '@/util/common';
import EventDetail from '@/components/EventDetail';
import Loading from '@/components/Common/Loading/Index';
import { EventProps } from '@/interfaces/common';

function SingleEvent({ event }: { event: EventProps }) {
  if (!event) {
    return <Loading />;
  }
  return <EventDetail event={event} />;
}

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const eventId = params.id;

  const filePath = buildEventPath();
  const data = await extractEvent(filePath);

  const event = data.find((e: any) => e.id === eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: event || null,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const filePath = buildEventPath();
  const data = extractEvent(filePath);

  const paths = data.map((event: EventProps) => ({
    params: { id: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default SingleEvent;
