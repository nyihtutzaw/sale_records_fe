import React from 'react';
import { Button } from '@mui/material';
import { Table } from '../components/Table';



export default {
  title: 'Table',
  component: Table,
};


function Template(args) {
  return <Table {...args} />
}


export const Default = Template.bind({});
Default.args = {
    headers:[
        {
            label:"No",
            content:(_data,index)=>(
                <Button>{index+1}</Button>
            )
        },
        {
            label:"Name",
            value:"name"
        },
        {
            label:"Age",
            value:"age"
        },
        {
            label:"Gender",
            value:"gender",
            content:(data)=>(
                data===1?"Male":"Female"
            )
        },
        {
            label:"Actions",
            content:()=>(
                    <Button>Edit</Button>
                )
        }
    ],
    rows:[
        {
            id:1,name:"Mg Mg",age:22,gender:1
        },
        {
            id:2,name:"Ma Ma",age:22,gender:2
        }
    ]
};



export const CustomWidth = Template.bind({});
CustomWidth.args = {
    width:"50%",
    height:"300px",
    headers:[
        {
            label:"No",
            content:(_data,index)=>(
                <Button>{index+1}</Button>
            )
        },
        {
            label:"Name",
            value:"name"
        },
        {
            label:"Age",
            value:"age"
        },
        {
            label:"Gender",
            value:"gender",
            content:(data)=>(
                data===1?"Male":"Female"
            )
        },
        {
            label:"Actions",
            content:()=>(
                    <Button>Edit</Button>
                )
        }
    ],
    rows:[
        {
            id:1,name:"Mg Mg",age:22,gender:1
        },
        {
            id:2,name:"Ma Ma",age:22,gender:2
        }
    ]
};


export const LoadingTable = Template.bind({});
LoadingTable.args = {
    loading:true,
    headers:[
        {
            label:"No",
            content:(_data,index)=>(
                <Button>{index+1}</Button>
            )
        },
        {
            label:"Name",
            value:"name"
        },
        {
            label:"Age",
            value:"age"
        },
        {
            label:"Gender",
            value:"gender",
            content:(data)=>(
                data===1?"Male":"Female"
            )
        },
        {
            label:"Actions",
            content:()=>(
                    <Button>Edit</Button>
                )
        }
    ],
    rows:[
        {
            id:1,name:"Mg Mg",age:22,gender:1
        },
        {
            id:2,name:"Ma Ma",age:22,gender:2
        }
    ]
};
