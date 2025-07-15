 "use client"
//  import ProjectHeader from '@/header/ProjectHeader';
import React, { useState } from 'react'
import BoardView from '../BoardView';
import ListView from '../ListView/ListView';
import ProjectHeader from '../header/ProjectHeader';
import TableView from '../tableView';
// import Timeline from '../Timeline';
import ModalNewTask from '@/components/ModaalNewTask';
import { useParams } from 'next/navigation';
import Timeline from '../Timeline';
 
// type Props = {
//   params: { id: string };
// };

const Project = () => {
  const params = useParams();
  const id = params?.id as string; // 👈 Safe type assertion
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;