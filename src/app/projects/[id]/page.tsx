 "use client"
 import ProjectHeader from '@/features/projects/header/ProjectHeader';
import React, { useState } from 'react'
import BoardView from '../BoardView';
 
type Props = {
    params: {id: string}
}

function Projects({params}: Props) {
    const {id} =params;
    const [activeTab,setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div className="">
     {/*  MODAL NEW TASKS */}
    <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}  />
    {activeTab === "Board" && (
    <BoardView setIsModalNewTaskOpen={setIsModalNewTaskOpen} id={id}/>
    )}
    </div>
  )
}

export default Projects