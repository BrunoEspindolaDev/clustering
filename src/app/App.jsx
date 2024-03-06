import { Flex, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react';

const App = () => {
  return (
    <Flex w="100vw" h="100vh" direction="column" bg="gray.900" gap={5} p={10}>
      <Flex align="center" justify="space-between">
        <Heading fontSize="2xl" color="white">
          Fruits Clustering
        </Heading>
        <ButtonGroup>
          <Button
            bg="gray.800"
            rounded="full"
            fontWeight="medium"
            colorScheme="transparent"
            _hover={{ bg: 'gray.700' }}>
            Models
          </Button>
          <Button
            bg="gray.800"
            rounded="full"
            fontWeight="medium"
            colorScheme="transparent"
            _hover={{ bg: 'gray.700' }}>
            Export Clusters
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex
        flex={1}
        direction="column"
        justify="center"
        align="center"
        bg="gray.800"
        rounded="2xl">
        <Text color="white">Loading model...</Text>
      </Flex>
    </Flex>
  );
};

export default App;
