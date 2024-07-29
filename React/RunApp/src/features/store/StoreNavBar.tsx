import { useState } from 'react';
import { TextInput, Container, Button, Group } from '@mantine/core';

function StoreNavBar() {
  const [value, setValue] = useState('');

  return (
    <Container>
      <Group>
        <Button />
        <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      </Group>
    </Container>
  );
}

export default StoreNavBar;
