import { useState } from "react";
import Button from "ui/Button";
import { InputText } from "ui/Form";
import Icon, { IconName } from "ui/Icon";
import { Col, Text, Row } from "ui/basic";


interface Node {
    meta?: {
        [key: string]: any; // Additional metadata as key-value pairs
        type?: string; 
      };
    id:string
    title? : string;
    data: string;
    children?: Node[];
}

const taskList: Node = {
    meta: { title: "Weekly Tasks" ,type:'container'},
    data: "These are the tasks we need to do",
    title: 'Tasks to do',
    id: '12332',
    children: [{
      data:'this is sub',
      id:'213213',
      title:'sub'
    }
    ]
}





const InfoGraph = () => {

  return (
    <Col>
      <Row a="center" j="center" p={'1rem'}>
        <Text>Notes Maker</Text>
      </Row>
      <Col style={{background:'#f4f4f4'}} p={'1rem'} br="0.5rem">
        <Row p={'0.5rem'}>
          <Button padding="0.25rem 0.5rem">
              +
          </Button>
        </Row>
        <NodeView node={taskList}/>
      </Col>
    </Col>
  );
};

const NodeView: React.FC<{node:Node}> = ({node}) => {

    const {title, data, children, id} = node
    const [firstClick, setFirstClick] = useState(false);
    const [showTools, setShowTools] = useState(false);

    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const [editData, setEditData] = useState(node.data);

    const handleSave = () => {
        setMode('view');
    };

    const handleShowTools = () => {
        if(mode === 'view'){
            setShowTools(pre => !pre)
        }
    }
    const gotoEditMode = () => {
        if(mode === 'view'){
            setMode('edit');
        }
      };

    return (
        <Col>
            <Row p='0.5rem 1rem' ><Text s="16" w={6}>{title}</Text></Row>
            <Row p='1rem' ><Text >{data}</Text></Row>
            <Col>
            {
              children &&  children.map((node,index) => (
                <Row p={'0.5rem'} key={index}>
                  <NodeView  node={node} />
                </Row>
              ))
            }
            </Col>
        </Col>
    )
}
export default InfoGraph;
