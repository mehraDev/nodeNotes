import Icon, { IconName } from 'ui/Icon';
import styled, { useTheme } from 'styled-components';
import { Box, Row, Text } from 'ui/basic';
import { useOptionsButton } from './OptionsProvider';

interface IMobileHeader{
    toggleSideNav: () => void;
    showLogo?: boolean;
    heading?: string;
}

const MobileHeader: React.FC<IMobileHeader> = ({heading,toggleSideNav,showLogo = true}) => {
    const theme = useTheme()
    const { hasOptionButton,setDisplayOptions,displayOptions } = useOptionsButton();
    const handleOptionButtonClick = () => {
        setDisplayOptions(!displayOptions)
      };
    
const Brand = <Text type='heading' s={theme.font.fontSizeHeading3} w={6} >DigiBhoomi</Text>
  return (
    <MobileHeaderWrapper a='center' j='between' p={'0.5rem'}>
        <div><Icon name={IconName.Bars} width={1.25} height={1.25} onClick={toggleSideNav} borderRadius={0} /> </div>
        <div>{heading ? <Text type='heading' s={theme.font.fontSizeHeading3} w={6}>{heading}</Text> : showLogo && Brand }</div>
        <div>{
            hasOptionButton  ?
            <Box h='2rem' w='2rem'>
            <Icon name={IconName.Ellipsis} width={1.25} height={1.25} onClick={handleOptionButtonClick} borderRadius={0} />
            </Box>
            : <Box h='2rem' w='2rem'></Box>
        }</div>
    </MobileHeaderWrapper>
    )
};

export default MobileHeader;

const MobileHeaderWrapper = styled(Row)`
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.083) 0px 1px 4px;
    height: 3rem;
    z-index: 1;
`
