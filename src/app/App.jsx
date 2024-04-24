import { FiRefreshCcw } from 'react-icons/fi';
import {
  Flex,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
  Icon,
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react';
import dataset from '../dataset.json';
import * as ml5 from 'ml5';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

const options = {
  k: 4,
  maxIter: 5,
  threshold: 0.5
};

const transformDataset = dataset => {
  return dataset.map(({ area, perimetro }) => ({
    x: area,
    y: perimetro
  }));
};

const colDict = {
  0: 'red',
  1: 'blue',
  2: 'green',
  3: 'purple',
  4: 'pink'
};

const makeChart = (svg, data) => {
  console.log({ data });
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d['0']))
    .range([10, width - 100]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d['1']))
    .range([height - 50, 20]);

  svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 5)
    .attr('fill', 'black');

  svg
    .selectAll('circle')
    .transition()
    .attr('fill', (_, i) => colDict[data[i].centroid]);
};

const App = () => {
  const svgRef = useRef(null);

  const [k, setK] = useState(1);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const kmeans = ml5.kmeans(
      transformDataset(dataset),
      { ...options, k },
      clustersCalculated
    );

    function clustersCalculated() {
      console.log('Points Clustered!');
      console.log(kmeans.dataset);
      setClusters(kmeans.dataset);
    }
  }, [k]);

  useEffect(() => {
    if (clusters?.length > 0) {
      const svg = d3.select(svgRef.current);
      makeChart(svg, clusters);
    }
  }, [clusters]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      overflowX="hidden"
      bg="gray.900"
      gap={5}
      p={10}>
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
        position="relative"
        direction="column"
        justify="center"
        align="center"
        bg="gray.800"
        rounded="2xl">
        <Flex>
          <FormControl>
            <FormLabel>K</FormLabel>
            <Select onChange={e => setK(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </FormControl>
        </Flex>
        <svg ref={svgRef} width="1000" height="600"></svg>

        <IconButton
          w="100px"
          h="100px"
          bg="gray.800"
          bottom="-50px"
          rounded="50%"
          borderWidth={5}
          borderColor="gray.900"
          position="absolute"
          aria-label="refresh"
          _hover={{ bg: 'gray.700' }}
          icon={<Icon as={FiRefreshCcw} w="24px" h="24px" color="white" />}
        />
      </Flex>
    </Flex>
  );
};

export default App;
