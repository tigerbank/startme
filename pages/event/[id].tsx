import React from 'react';
import { buildEventPath, extractEvent } from 'util/common';
import EventDetail from 'components/EventDetail';
import Loading from 'components/Loading/Index';

function SingleEvent({ event }: any) {
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
  };
};

export async function getStaticPaths() {
  const filePath = buildEventPath();
  const data = extractEvent(filePath);

  const paths = data.map((event: any) => ({
    params: { id: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default SingleEvent;
