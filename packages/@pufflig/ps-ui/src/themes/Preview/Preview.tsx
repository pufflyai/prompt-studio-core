import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { convertIcon } from "../../utils/convertIcon";
import { baseColors, borderColors, brandColors, fontColors, sectionColors } from "../colors";

export const ColorBox = ({ color }: { color: string }) => {
  return <Box w={"40px"} h={"40px"} borderRadius={3} bg={color}></Box>;
};

export const Preview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPopoverOpen, onOpen: onOpenPopover, onClose: onClosePopover } = useDisclosure();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef(null);
  const { colorMode } = useColorMode();
  return (
    <Flex direction="column" gap="4">
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Base Colors</Text>
        <Flex gap="2">
          <ColorBox color={baseColors[colorMode][800]} />
          <ColorBox color={baseColors[colorMode][600]} />
          <ColorBox color={baseColors[colorMode][400]} />
          <ColorBox color={baseColors[colorMode][200]} />
          <ColorBox color={baseColors[colorMode][100]} />
          <ColorBox color={baseColors[colorMode][60]} />
        </Flex>
        <Flex gap="2"></Flex>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Brand Colors</Text>
        <Flex gap="2">
          <ColorBox color={brandColors[900]} />
          <ColorBox color={brandColors[400]} />
          <ColorBox color={brandColors[300]} />
          <ColorBox color={brandColors[200]} />
          <ColorBox color={brandColors[100]} />
          <ColorBox color={brandColors[50]} />
        </Flex>
        <Flex gap="2"></Flex>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Border Colors</Text>
        <Flex gap="2">
          <ColorBox color={borderColors[colorMode].PRIMARY} />
          <ColorBox color={borderColors[colorMode].SECONDARY} />
        </Flex>
        <Flex gap="2"></Flex>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Font Colors</Text>
        <Flex gap="2">
          <ColorBox color={fontColors[colorMode].PRIMARY} />
          <ColorBox color={fontColors[colorMode].SECONDARY} />
        </Flex>
        <Flex gap="2"></Flex>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"pageTitle"}>Page Title</Text>
        <Text textStyle={"assetTitle"}>Asset Title</Text>
        <Text textStyle={"panelTitle"}>Panel Title</Text>
        <Text textStyle={"promptText"}>Prompt Text</Text>
        <Text textStyle={"listItemText"}>List Item Text</Text>
        <Text textStyle={"buttonText"}>Button Text</Text>
        <Text textStyle={"assetSubheader"}>Asset Subheader</Text>
        <Text textStyle={"primary"}>Primary Text</Text>
        <Text textStyle={"secondary"}>Secondary Text</Text>
        <Text textStyle={"danger"}>Danger Text</Text>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Layouts</Text>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column" maxWidth={"120px"}>
        <Text textStyle={"panelTitle"}>Buttons</Text>
        <Flex>
          <Flex direction="column" gap="2" padding="2" bg={sectionColors[colorMode]["base"]}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading></Button>
            <Button variant="danger" leftIcon={<WarningIcon />}>
              Warning
            </Button>
          </Flex>
          <Flex direction="column" gap="2" padding="2" bg={sectionColors[colorMode]["secondary"]}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading></Button>
            <Button variant="danger" leftIcon={<WarningIcon />}>
              Warning
            </Button>
          </Flex>
          <Flex direction="column" gap="2" padding="2" bg={sectionColors[colorMode]["editor"]}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading></Button>
            <Button variant="danger" leftIcon={<WarningIcon />}>
              Warning
            </Button>
          </Flex>
          <Flex direction="column" gap="2" padding="2" bg={sectionColors[colorMode]["modal"]}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading></Button>
            <Button variant="danger" leftIcon={<WarningIcon />}>
              Warning
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex borderRadius={3} padding="12px" gap="2" direction="column" maxWidth={"120px"}>
        <Text textStyle={"panelTitle"}>Drawer</Text>
        <Button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Open Drawer
        </Button>
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent ref={containerRef}>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text>Providers</Text>
            </DrawerHeader>
            <DrawerBody>
              <Stack></Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Skeleton</Text>
        <Skeleton w="120px" h="40px" />
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Inputs</Text>
        <Input placeholder="Input" />
        <Textarea placeholder="Textarea" />
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Modals</Text>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>WW</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Yo! Mr white...</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Modals</Text>
        <Popover isOpen={isPopoverOpen} onClose={onClosePopover}>
          <PopoverTrigger>
            <Button onClick={onOpenPopover}>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            <PopoverFooter>
              <ButtonGroup size="sm">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Accept</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
      <Divider />
      <Flex borderRadius={3} padding="12px" gap="2" direction="column">
        <Text textStyle={"panelTitle"}>Menus</Text>
        <Menu>
          <MenuButton
            as={IconButton}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Options"
            icon={<Icon fontSize="lg" as={convertIcon(faEllipsisVertical)} />}
          />
          <MenuList>
            <MenuGroup title="Group 1">
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Group 2">
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
