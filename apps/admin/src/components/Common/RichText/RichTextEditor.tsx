import type { Value as PlateValue } from 'platejs';
import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import { Plate, usePlateEditor } from 'platejs/react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa6';
import { 
    EditorContainer, 
    Editor,
    BlockquoteElement,
    H1Element,
    H2Element,
    H3Element,
    FixedToolbar, 
    MarkToolbarButton, 
    ToolbarButton
} from '@repo/ui';

interface RichTextEditorProps {
    value: PlateValue,
    onChange: (value: PlateValue) => void
};

function RichTextEditor({ value, onChange }: RichTextEditorProps) {

    const editor = usePlateEditor({
        plugins: [
            BoldPlugin, 
            ItalicPlugin, 
            UnderlinePlugin,
            H1Plugin.withComponent(H1Element),
            H2Plugin.withComponent(H2Element),
            H3Plugin.withComponent(H3Element),
            BlockquotePlugin.withComponent(BlockquoteElement),
        ],
        value
    });

    return(
        <Plate 
            editor={editor}
            onChange={({ value }) => onChange(value)}
        >
            <FixedToolbar className="bg-muted justify-start">
                <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>
                
                <MarkToolbarButton nodeType="bold" tooltip="Bold (CTRL+B)">
                    <FaBold />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="italic" tooltip="Italic (CTRL+I)">
                    <FaItalic />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="underline" tooltip="Underline (CTRL+U)">
                    <FaUnderline />
                </MarkToolbarButton>
            </FixedToolbar>
            <EditorContainer 
                className={`
                    bg-card-light rounded-b-xl px-4 py-4 border-background border-1
                `}
            >
                <Editor className="!pl-0 !pr-0" placeholder="Type your content here..." />
            </EditorContainer>
        </Plate>
    );
};

export default RichTextEditor;