import { flexWrap, flexDirection, alignSelf, alignItems, justifyContent } from 'styled-system';
import Box from '../Box';

const Flex = Box.extend([], { display: 'flex' }, flexWrap, flexDirection, alignItems, alignSelf, justifyContent);

Flex.displayName = 'Flex';

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...alignSelf.propTypes,
  ...justifyContent.propTypes,
};

export default Flex;