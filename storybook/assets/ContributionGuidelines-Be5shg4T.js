import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-BFLr8zRQ.js";import{M as r}from"./index-BHYN3IGc.js";import"./index-DvOVhSYJ.js";import"./iframe-BmC_3Ckl.js";import"./index-BYLy_Wld.js";import"./index-DR0bsqIr.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function o(t){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Contribution Guidelines"}),`
`,e.jsx(n.h1,{id:"contribution-guidelines",children:"Contribution Guidelines"}),`
`,e.jsx(n.p,{children:"We welcome contributions from anyone! To ensure consistency and maintain high-quality standards in our Storybook, please follow these guidelines when contributing."}),`
`,e.jsx(n.h2,{id:"story-format-and-structure",children:"Story Format and Structure"}),`
`,e.jsx(n.p,{children:"To maintain a consistent structure across all components in our Storybook, adhere to the following guidelines:"}),`
`,e.jsxs(n.h3,{id:"1-component-story-format",children:["1. ",e.jsx(n.strong,{children:"Component Story Format"})]}),`
`,e.jsxs(n.p,{children:["All stories must follow the ",e.jsx(n.a,{href:"https://storybook.js.org/docs/react/api/csf",rel:"nofollow",children:"Component Story Format (CSF)"})," to ensure that our Storybook is easy to navigate and well-organized. CSF is the recommended way to write stories in Storybook, providing a clear, modular, and maintainable structure."]}),`
`,e.jsxs(n.h3,{id:"2-default-story",children:["2. ",e.jsx(n.strong,{children:"Default Story"})]}),`
`,e.jsxs(n.p,{children:["Each component should include a default story titled ",e.jsx(n.code,{children:"meta"}),". This default story should serve as the main entry point for the component. Place the component in the appropriate category in the ",e.jsx(n.code,{children:"title"})," propery. This helps in maintaining consistency and clarity in how we organize our stories."]}),`
`,e.jsx(n.h4,{id:"a-component-story-format",children:"a. Component Story Format"}),`
`,e.jsx(n.p,{children:"Meta and story configuration (you can directly use this):"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`const meta: Meta<typeof SampleButton> = {\r
  title: '<Component_Category>/<Name_Of_Component>',\r
  component: SampleButton,\r
  parameters: {\r
    layout: 'centered',\r
    docs: {\r
      description: {\r
        component: 'Description of the component',\r
      },\r
    },\r
  },\r
  tags: ['autodocs'],\r
  argTypes: {\r
    // argument types of the props of the components with description for each arg type\r
  },\r
  args: {\r
    // args of the default story\r
  },\r
};\r
\r
export default meta;
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Tags"})}),`
`,e.jsx(n.p,{children:"Include the autodocs tag in your story metadata to enable automated documentation generation. This ensures that our Storybook remains well-documented and easy to understand."}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`tags: ['autodocs'],
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Prop Descriptions and Controls"})}),`
`,e.jsxs(n.p,{children:["Make sure to add detailed descriptions for each prop using the ",e.jsx(n.code,{children:"argTypes"})," property. This documentation helps other developers understand what each prop does and how to use it. Additionally, make sure to add controls for interactive testing in the Storybook UI."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`argTypes: {\r
  label: {\r
    control: 'text',\r
    description: 'The text to be displayed on the button',\r
  },\r
  onClick: {\r
    action: 'clicked',\r
    description: 'Callback function that is called when the button is clicked',\r
  },\r
}\r

`})}),`
`,e.jsx(n.h3,{id:"3-visual-changes-based-on-props",children:"3. Visual Changes based on Props"}),`
`,e.jsx(n.p,{children:"For every component, create separate stories to showcase visual changes based on different props. This makes it easier for other developers and designers to understand how the component behaves with various configurations."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`export const LongButton: Story = {\r
  args: {\r
    label: 'Button with long text',\r
    onClick: action('onButtonClick'),\r
  },\r
};\r

`})}),`
`,e.jsx(n.p,{children:"To ensure your stories provide a comprehensive overview of how components behave under different conditions, follow these guidelines:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Cover Different Component States:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each story should represent distinct states of the component, such as loading, disabled, or/and error states."}),`
`,e.jsx(n.li,{children:"These stories should illustrate how the component responds when different props are passed, ensuring that the component's various UI states are well represented."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Do Not Create Separate Stories for Event-Driven UI Changes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Avoid creating stories for UI changes that occur due to internal event listeners (e.g., onMouseEnter, onMouseLeave, onFocus, onBlur)."}),`
`,e.jsx(n.li,{children:`Example scenarios to avoid creating separate stories for:\r
Hover effects (UI changes when the component is hovered).\r
Focus or blur events (UI changes when the component gains or loses focus).\r
Active or selected states driven by user interaction (unless these states are controlled by component props).`}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Create Separate Stories for Prop-Driven UI Changes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:`Emphasize creating stories that demonstrate how the component behaves with different combinations of props.\r
These stories provide insight into how users can configure the component to meet their needs.`}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"When the UI changes based on prop values, create a dedicated story to showcase that behavior. These stories help visualize how different prop configurations affect the component’s appearance and behavior."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Examples:"}),`
`,e.jsxs(n.p,{children:["A Button component with an ",e.jsx(n.code,{children:"isEnabled"})," prop:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"isEnabled"})," is true, the button has a default background color."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"isEnabled"})," is false, the button's background color changes to indicate that it's disabled."]}),`
`]}),`
`,e.jsxs(n.p,{children:["A Button component with an ",e.jsx(n.code,{children:"iconPosition"})," prop:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"iconPosition"}),' is "left", the icon is displayed to the left of the button text.']}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"iconPosition"}),' is "right", the icon is displayed to the right of the button text.']}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"4-play-functions",children:"4. Play Functions"}),`
`,e.jsxs(n.p,{children:["Each component should include a play function in relevant stories (stories depicting hover state UI may or may not require play functions for testing component logic) that not only demonstrates the component’s visual state but also tests its behavior. By separating the play functions into a dedicated ",e.jsx(n.code,{children:"playFunctions.ts"})," file, you can maintain a modular and reusable structure across your stories. This approach helps validate that components work as expected when interacted with, while keeping the story files clean and focused on configuration."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Steps"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Define reusable play functions in a separate playFunctions.ts file. Each play function can simulate user interactions and perform assertions to verify the behavior of the component."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`// playFunctions.ts\r
\r
import { expect, fn, userEvent, within } from '@storybook/test';\r
import { PlayFunctionProps } from '@definitions/playFunctions';\r
import { SampleInputFieldProps } from './SampleInputField';\r
\r
// Play function for Email Input\r
export const emailInputPlayFunction = async ({\r
  canvasElement,\r
  args,\r
}: PlayFunctionProps<SampleInputFieldProps>) => {\r
  const canvas = within(canvasElement);\r
  const handleInputChange = fn();\r
  const input = canvas.getByLabelText(args?.labelText || /email input label/i);\r
  input.addEventListener('input', handleInputChange);\r
  await userEvent.type(input, 'test@example.com');\r
  expect(input).toHaveValue('test@example.com');\r
  await expect(handleInputChange).toBeCalled();\r
};
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`import {\r
  emailInputPlayFunction,\r
} from './playFunctions';\r
export const EmailInputField: Story = {\r
  args: {\r
    inputType: 'email',\r
    inputName: 'emailInput',\r
    inputId: 'emailInputId',\r
    inputTestId: 'emailInputTestId',\r
    labelText: 'Email Input Label',\r
  },\r
  play: emailInputPlayFunction,\r
};
`})}),`
`,e.jsx(n.h3,{id:"summary",children:"Summary"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Component Story Format (CSF)"}),": All stories should be written using the CSF, which is a standardized way to write stories in Storybook."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Default Story"}),": Each component should have a single default story titled ",e.jsx(n.code,{children:"meta"}),". This story serves as the primary story for the component."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tags"}),": Include ",e.jsx(n.code,{children:"autodocs"})," in the tags to ensure automated documentation is generated."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prop Descriptions and Controls"}),": Provide detailed descriptions for each prop using ",e.jsx(n.code,{children:"argTypes"}),", and set up controls for interactive testing."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Visual Changes Based on Props"}),": Emphasize creating stories that demonstrate how the component behaves with different combinations of props. Separate stories should be created to showcase how different props affect the component’s appearance and behavior."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Play Functions"}),": Each story should include a play functions to test the component’s interaction in a separate ",e.jsx(n.code,{children:"playFunctions.ts"})," file which can be imported in ",e.jsx(n.code,{children:"Component.stories.tsx"}),". This ensures that the components behave as expected during user interactions."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Component State Management"}),": Ensure that your stories cover all possible states of the component to provide a comprehensive overview."]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"This document will guide contributors in maintaining consistency and quality in the Storybook while ensuring that all components are well-documented, tested, and easily understandable."}),`
`,e.jsx(n.h2,{id:"general-contribution-steps",children:"General Contribution Steps"}),`
`,e.jsx(n.p,{children:"Once you've completed your story:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pull Requests"}),": Submit pull requests for review once your work is complete for review from one of the maintainers. Include a clear description of the changes and reference the related ",e.jsx(n.em,{children:"Linear ticket"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Report Issues"}),": Please report any issues via the ",e.jsx(n.em,{children:"Linear App"})," before starting work on them."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Branching Strategy"}),": Always create a new branch for your work based on the ",e.jsx(n.code,{children:"dev"})," branch (tentative for now)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Note"}),": Ensure that your code adheres to the project's coding standards and that all tests pass"]}),`
`]}),`
`,e.jsx(n.p,{children:"Thank you for your contribution! By following these guidelines, you help maintain a high standard of quality in our Storybook, making it a valuable resource for the frontend and UI team."})]})}function x(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{x as default};
