import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Loader } from './Loader';

export default {
    title: 'shared/ui/Loader',
    component: Loader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
