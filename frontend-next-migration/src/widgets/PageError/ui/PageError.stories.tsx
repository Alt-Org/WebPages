import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageError } from './PageError';

export default {
    title: 'widgets/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => <PageError {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
