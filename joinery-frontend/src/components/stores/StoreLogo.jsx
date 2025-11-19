import React from 'react';
import { Image, Paper, Center } from '@mantine/core';
import { IconPhotoScan } from "@tabler/icons-react";

const StoreLogo = ({ imageUrl, altText, size = 120, withBorder = true }) => {
  const iconSize = size * 0.4;

  return (
    <Paper
      shadow="xs"
      radius="sm"
      withBorder={withBorder}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--mantine-color-gray-1)',
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={altText}
          fit="contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <Center style={{ width: '100%', height: '100%' }}>
          <IconPhotoScan size={iconSize} color="var(--mantine-color-gray-5)" />
        </Center>
      )}
    </Paper>
  );
};

export default StoreLogo;