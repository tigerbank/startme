import { Box, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function TruncateText({ text, width }: { text: string; width: string }) {
  const [readMore, setReadMore] = useState(false);

  const handleClick = () => {
    setReadMore(!readMore);
  };

  return (
    <Box>
      <Text
        width={width}
        height={readMore ? 'auto' : '20px'}
        overflow={readMore ? 'auto' : 'hidden'}
        textOverflow={readMore ? 'initial' : 'ellipsis'}
        whiteSpace={readMore ? 'initial' : 'nowrap'}
        className="ellipsis-text"
      >
        {text}
      </Text>
      <Text color="grey" onClick={handleClick}>
        {readMore ? 'Show less' : 'Show more'}
      </Text>
    </Box>
  );
}

export default TruncateText;
