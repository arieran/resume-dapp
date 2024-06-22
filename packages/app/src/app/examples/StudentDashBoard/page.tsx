'use client'; // Ensure this is a client component

import React, { useState } from 'react';
import './StudentHashBoard.css'; // 引入CSS文件

interface Education {
  schoolName: string;
  location?: string;
  major: string;
  degree: string;
  gradeFormat: string;
  grade: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  companyName: string;
  position?: string;
  startDate: string;
  endDate: string;
  positionDescription: string; // 添加职位描述属性
}

interface Skill {
  skillName: string;
  proficiency: string;
}

interface Project {
    projectName: string;
    startDate: string;
    endDate: string;
    inProgress: boolean;
    projectDescription: string;
    responsibilities: string;
    projectLink?: string;
  }
  
  interface Certificate {
    certificateName: string;
    certificateUrl: string;
    issuingAuthority: string;
    issueDate: string;
    expiryDate: string;
    willExpire: boolean;
  }

  interface Honor {
    honorName: string;
    proofDocumentUrl: string;
  }
  

const StudentHashBoard: React.FC = () => {
  const [studentName, setStudentName] = useState('User Name');
  const [education, setEducation] = useState<Education[]>([]);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState<Education>({
    schoolName: '',
    location: '',
    major: '',
    degree: '',
    gradeFormat: '',
    grade: '',
    startDate: '',
    endDate: '',
  });

  const [experience, setExperience] = useState<Experience[]>([]);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    positionDescription: '', // 初始状态中包含职位描述属性
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkills, setNewSkills] = useState<Skill[]>([{ skillName: '', proficiency: '' }]);
  const [editingSkill, setEditingSkill] = useState<Skill>({ skillName: '', proficiency: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    projectName: '',
    startDate: '',
    endDate: '',
    inProgress: false,
    projectDescription: '',
    responsibilities: '',
    projectLink: '',
  });

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    certificateName: '',
    certificateUrl: '',
    issuingAuthority: '',
    issueDate: '',
    expiryDate: '',
    willExpire: false,
  });
  const [editingCertificate, setEditingCertificate] = useState<Certificate>({
    certificateName: '',
    certificateUrl: '',
    issuingAuthority: '',
    issueDate: '',
    expiryDate: '',
    willExpire: false,
  });


  const [editingProject, setEditingProject] = useState<Project>({
    projectName: '',
    startDate: '',
    endDate: '',
    inProgress: false,
    projectDescription: '',
    responsibilities: '',
    projectLink: '',
  });

  const [honors, setHonors] = useState<Honor[]>([]);
  const [isAddingHonor, setIsAddingHonor] = useState(false);
  const [newHonors, setNewHonors] = useState<Honor[]>([]);


  const [editingHonorIndex, setEditingHonorIndex] = useState<number | null>(null);
  const [editingHonor, setEditingHonor] = useState<Honor>({
    honorName: '', 
    proofDocumentUrl: ''
  });


  const handleSaveEducation = () => {
    if (isEditing && editingIndex !== null) {
      const updatedEducation = [...education];
      updatedEducation[editingIndex] = newEducation;
      setEducation(updatedEducation);
    } else {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      schoolName: '',
      location: '',
      major: '',
      degree: '',
      gradeFormat: '',
      grade: '',
      startDate: '',
      endDate: '',
    });
    setIsAddingEducation(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancelEducation = () => {
    setNewEducation({
      schoolName: '',
      location: '',
      major: '',
      degree: '',
      gradeFormat: '',
      grade: '',
      startDate: '',
      endDate: '',
    });
    setIsAddingEducation(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleSaveExperience = () => {
    if (isEditing && editingIndex !== null) {
      const updatedExperience = [...experience];
      updatedExperience[editingIndex] = newExperience;
      setExperience(updatedExperience);
    } else {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      positionDescription: '', // 初始状态中包含职位描述属性
    });
    setIsAddingExperience(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleCancelExperience = () => {
    setNewExperience({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      positionDescription: '', // 初始状态中包含职位描述属性
    });
    setIsAddingExperience(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleSaveSkills = () => {
    if (isEditing && editingIndex !== null) {
      const updatedSkills = [...skills];
      updatedSkills[editingIndex] = editingSkill;
      setSkills(updatedSkills);
    } else {
      setSkills([...skills, ...newSkills]);
    }
    setNewSkills([{ skillName: '', proficiency: '' }]);
    setIsAddingSkill(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleAddSkillField = () => {
    setNewSkills([...newSkills, { skillName: '', proficiency: '' }]);
  };

  const handleEditSkill = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditingSkill(skills[index]);
    setIsAddingSkill(true);
  };


  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...newSkills];
    updatedSkills[index][field] = value;
    setNewSkills(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSaveProject = () => {
    if (isEditing && editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = editingProject;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }
    setNewProject({
      projectName: '',
      startDate: '',
      endDate: '',
      inProgress: false,
      projectDescription: '',
      responsibilities: '',
      projectLink: '',
    });
    setIsAddingProject(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditProject = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditingProject(projects[index]);
    setIsAddingProject(true);
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleSaveCertificate = () => {
    if (isEditing && editingIndex !== null) {
      const updatedCertificates = [...certificates];
      updatedCertificates[editingIndex] = editingCertificate;
      setCertificates(updatedCertificates);
    } else {
      setCertificates([...certificates, newCertificate]);
    }
    setNewCertificate({
      certificateName: '',
      certificateUrl: '',
      issuingAuthority: '',
      issueDate: '',
      expiryDate: '',
      willExpire: false,
    });
    setIsAddingCertificate(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditCertificate = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditingCertificate(certificates[index]);
    setIsAddingCertificate(true);
  };

  const handleDeleteCertificate = (index: number) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  const handleSaveHonor = () => {
    if (isEditing && editingIndex !== null) {
        // 正确克隆数组并更新特定索引
        const updatedHonors = [...honors];
        updatedHonors[editingIndex] = newHonors[0]; // 只取newHonors中的第一个元素（如果是单个编辑的情况）
        setHonors(updatedHonors);
    } else {
        // 将 newHonors 数组中的所有荣誉添加到 honors 数组中
        setHonors([...honors, ...newHonors]);
    }
    setNewHonors([{ honorName: '', proofDocumentUrl: '' }]); // 重置表单
    setIsAddingHonor(false);
    setEditingHonorIndex(null);
};

 // 添加新的空荣誉表单项
const handleAddNewHonorField = () => {
  setNewHonors([...newHonors, { honorName: '', proofDocumentUrl: '' }]);
};

  
  
  const handleHonorChange = (index: number, field: string, value: string) => {
    const updatedHonors = [...newHonors];
    updatedHonors[index] = { ...updatedHonors[index], [field]: value };
    setNewHonors(updatedHonors);
  };
  

  const handleCancelHonor = () => {
    setNewHonors([{ honorName: '', proofDocumentUrl: '' }]); // 重置为初始单一空表单项
    setIsAddingHonor(false);
    setEditingHonorIndex(null);
};


  const handleDeleteHonor = (index: number) => {
    const updatedHonors = [...honors];
    updatedHonors.splice(index, 1);
    setHonors(updatedHonors);
  };

  const handleEditHonor = (index: number) => {
    setIsEditing(true);
    setEditingHonorIndex(index);
    setNewHonors([honors[index]]); // 加载当前编辑项到 newHonors 以进行修改
    setIsAddingHonor(true);
};
  return (
    <div className="loginBox">
      <h1>{studentName}</h1>
      <div>
        <h2>教育背景</h2>
        {education.map((edu, index) => (
          <div key={index}>
            <p>{`${edu.schoolName} - ${edu.degree} in ${edu.major}`}</p>
            <button className="btn" onClick={() => {
              setIsEditing(true);
              setEditingIndex(index);
              setNewEducation(education[index]);
              setIsAddingEducation(true);
            }}>
              Edit
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
        {!isAddingEducation && (
          <button className="btn" onClick={() => setIsAddingEducation(true)}>
            添加教育
            <span></span><span></span><span></span><span></span>
          </button>
        )}
        {isAddingEducation && (
          <div>
            <form>
              {/* 教育背景编辑表单 */}
              <div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newEducation.schoolName}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, schoolName: e.target.value })
                    }
                  />
                  <label>学校名称</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newEducation.location}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, location: e.target.value })
                    }
                  />
                  <label>位置（可选）</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newEducation.major}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, major: e.target.value })
                    }
                  />
                  <label>专业</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, degree: e.target.value })
                    }
                  />
                  <label>授予学位</label>
                </div>
                <div className="item select-item">
                  <select
                    required
                    value={newEducation.gradeFormat}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, gradeFormat: e.target.value })
                    }
                  >
                    <option value="">选择成绩格式</option>
                    <option value="GPA-Out of 4">GPA-Out of 4</option>
                    <option value="GPA-Out of 10">GPA-Out of 10</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newEducation.grade}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, grade: e.target.value })
                    }
                  />
                  <label>授予等级</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newEducation.startDate}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, startDate: e.target.value })
                    }
                  />
                  <label>开始日期</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newEducation.endDate}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, endDate: e.target.value })
                    }
                  />
                  <label>结束日期</label>
                </div>
                <button className="btn" type="button" onClick={handleSaveEducation}>
                  保存
                  <span></span><span></span><span></span><span></span>
                </button>
                <button className="btn" type="button" onClick={handleCancelEducation}>
                  取消
                  <span></span><span></span><span></span><span></span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        <h2>工作经验</h2>
        {experience.map((exp, index) => (
          <div key={index}>
            <p>{`${exp.companyName} - ${exp.position}`}</p>
            <button className="btn" onClick={() => {
              setIsEditing(true);
              setEditingIndex(index);
              setNewExperience(experience[index]);
              setIsAddingExperience(true);
            }}>
              Edit
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
        {!isAddingExperience && (
          <button className="btn" onClick={() => setIsAddingExperience(true)}>
            添加工作经验
            <span></span><span></span><span></span><span></span>
          </button>
        )}
        {isAddingExperience && (
          <div>
            <form>
              {/* 工作经验编辑表单 */}
              <div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newExperience.companyName}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, companyName: e.target.value })
                    }
                  />
                  <label>公司名称</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newExperience.position}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, position: e.target.value })
                    }
                  />
                  <label>职位</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newExperience.startDate}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, startDate: e.target.value })
                    }
                  />
                  <label>开始日期</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newExperience.endDate}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, endDate: e.target.value })
                    }
                  />
                  <label>结束日期</label>
                </div>
                <div className="item">
            <h3>职位描述</h3>
           <p className="hint" style={{ fontSize: '0.8em' }}>展示你在这份工作期间所做的工作</p>
           <div className="textbox-container">
                <textarea className="textbox" placeholder="请输入职位描述" style={{ color: 'white' }}></textarea>
          </div>
         </div>


                <button className="btn" type="button" onClick={handleSaveExperience}>
                  保存
                  <span></span><span></span><span></span><span></span>
                </button>
                <button className="btn" type="button" onClick={handleCancelExperience}>
                  取消
                  <span></span><span></span><span></span><span></span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        <h2>技能</h2>
        {skills.map((skill, index) => (
          <div key={index}>
            <p>{`${skill.skillName} - ${skill.proficiency}`}</p>
            <button className="btn" onClick={() => handleEditSkill(index)}>
              编辑
              <span></span><span></span><span></span><span></span>
            </button>
            <button className="btn" onClick={() => handleDeleteSkill(index)}>
              删除
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
         {!isAddingSkill && (
          <button className="btn" onClick={() => setIsAddingSkill(true)}>
            添加技能
            <span></span><span></span><span></span><span></span>
          </button>
        )}
        {isAddingSkill && (
          <div>
            <form>
              {isEditing && (
                <div>
                  <div className="item">
                    <input
                      type="text"
                      required
                      value={editingSkill.skillName}
                      onChange={(e) => setEditingSkill({ ...editingSkill, skillName: e.target.value })}
                    />
                     <label>技能名称</label>
                  </div>
                  <div className="item">
                    <input
                      type="text"
                      required
                      value={editingSkill.proficiency}
                      onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: e.target.value })}
                    />
                    <label>熟练度</label>
                  </div>
                </div>
              )}
              {!isEditing && newSkills.map((skill, index) => (
                <div key={index}>
                  <div className="item">
                    <input
                      type="text"
                      required
                      value={skill.skillName}
                      onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
                    />
                    <label>技能</label>
                  </div>
                </div>
              ))}
              <button className="btn" type="button" onClick={handleSaveSkills}>
                保存
                <span></span><span></span><span></span><span></span>
              </button>
              <button className="btn" type="button" onClick={() => {
                setIsAddingSkill(false);
                setIsEditing(false);
                setEditingIndex(null);
                setEditingSkill({ skillName: '', proficiency: '' });
              }}>
                取消
                <span></span><span></span><span></span><span></span>
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        <h2>项目经验</h2>
        {projects.map((project, index) => (
          <div key={index}>
            <p>{`${project.projectName} - ${project.startDate} to ${project.endDate}`}</p>
            <button className="btn" onClick={() => handleEditProject(index)}>
              编辑
              <span></span><span></span><span></span><span></span>
            </button>
            <button className="btn" onClick={() => handleDeleteProject(index)}>
              删除
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
        {!isAddingProject && (
          <button className="btn" onClick={() => setIsAddingProject(true)}>
            添加项目
            <span></span><span></span><span></span><span></span>
          </button>
        )}
        {isAddingProject && (
          <div>
            <form>
              <div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newProject.projectName}
                    onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  />
                  <label>项目名称</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
                  <label>开始日期</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                  />
                  <label>结束日期</label>
                </div>
                <div>
  <input type="checkbox" id="stillcontinuing" name="stillcontinuing" value="stillcontinuing" />
  <label htmlFor="stillcontinuing">项目是否还在进行</label>
</div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newProject.projectDescription}
                    onChange={(e) =>
                      setNewProject({ ...newProject, projectDescription: e.target.value })
                    }
                  />
                  <label>项目内容</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newProject.responsibilities}
                    onChange={(e) =>
                      setNewProject({ ...newProject, responsibilities: e.target.value })
                    }
                  />
                  <label>项目中的职责</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newProject.projectLink}
                    onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                  />
                  <label>项目链接（可选）</label>
                </div>
              </div>
              <button className="btn" type="button" onClick={handleSaveProject}>
                保存
                <span></span><span></span><span></span><span></span>
              </button>
              <button className="btn" type="button" onClick={() => {
                setIsAddingProject(false);
                setIsEditing(false);
                setEditingIndex(null);
                setEditingProject({
                  projectName: '',
                  startDate: '',
                  endDate: '',
                  inProgress: false,
                  projectDescription: '',
                  responsibilities: '',
                  projectLink: '',
                });
              }}>
                取消
                <span></span><span></span><span></span><span></span>
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        <h2>持有证书</h2>
        {certificates.map((certificate, index) => (
          <div key={index}>
            <p>{`${certificate.certificateName} - ${certificate.issueDate} to ${certificate.expiryDate}`}</p>
            <button className="btn" onClick={() => handleEditCertificate(index)}>
              编辑
              <span></span><span></span><span></span><span></span>
            </button>
            <button className="btn" onClick={() => handleDeleteCertificate(index)}>
              删除
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
        {!isAddingCertificate && (
          <button className="btn" onClick={() => setIsAddingCertificate(true)}>
            添加证书
            <span></span><span></span><span></span><span></span>
          </button>
        )}
        {isAddingCertificate && (
          <div>
            <form>
              <div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newCertificate.certificateName}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, certificateName: e.target.value })
                    }
                  />
                  <label>证书名称</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newCertificate.certificateUrl}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, certificateUrl: e.target.value })
                    }
                  />
                  <label>获得证书网址</label>
                </div>
                <div className="item">
                  <input
                    type="text"
                    required
                    value={newCertificate.issuingAuthority}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, issuingAuthority: e.target.value })
                    }
                  />
                  <label>经证明/主管部门</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newCertificate.issueDate}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, issueDate: e.target.value })
                    }
                  />
                  <label>签发日期</label>
                </div>
                <div className="item">
                  <input
                    type="date"
                    required
                    value={newCertificate.expiryDate}
                    onChange={(e) =>
                      setNewCertificate({ ...newCertificate, expiryDate: e.target.value })
                    }
                  />
                  <label>到期日</label>
                </div>
                <div>
  <input type="checkbox" id="stillcontinuing" name="stillcontinuing" value="stillcontinuing" />
  <label htmlFor="stillcontinuing">此证书是否会过期</label>
</div>
              </div>
              <button className="btn" type="button" onClick={handleSaveCertificate}>
                保存
                <span></span><span></span><span></span><span></span>
              </button>
              <button className="btn" type="button" onClick={() => {
                setIsAddingCertificate(false);
                setIsEditing(false);
                setEditingIndex(null);
                setEditingCertificate({
                  certificateName: '',
                  certificateUrl: '',
                  issuingAuthority: '',
                  issueDate: '',
                  expiryDate: '',
                  willExpire: false,
                });
              }}>
                取消
                <span></span><span></span><span></span><span></span>
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
      <h2>荣誉奖励</h2>
        {honors.map((honor, index) => (
          <div key={index}>
              <p>{honor.honorName}</p>
            <button className="btn" onClick={() => handleEditHonor(index)}>
              编辑
              <span></span><span></span><span></span><span></span>
            </button>
            <button className="btn" onClick={() => handleDeleteHonor(index)}>
              删除
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
        ))}
         {!isAddingHonor && (
          <button className="btn" onClick={() => setIsAddingHonor(true)}>
            添加荣誉证书/奖项
            <span></span><span></span><span></span><span></span>
          </button>
        )}
      {isAddingHonor && (
  <div>
    <form>
      {newHonors.map((honor, index) => (
        <div key={index}>
          <div className="item">
            <input
              type="text"
              required
              value={honor.honorName}
              onChange={(e) => handleHonorChange(index, 'honorName', e.target.value)}
            />
            <label>荣誉奖项/证书名称</label>
          </div>
          <div className="item">
            <input
              type="text"
              required
              value={honor.proofDocumentUrl}
              onChange={(e) => handleHonorChange(index, 'proofDocumentUrl', e.target.value)}
              placeholder="证明材料URL"
            />
          </div>
        </div>
      ))}
      {/* 提供按钮以添加新的荣誉字段 */}
      <button className="btn" onClick={handleAddNewHonorField} type="button">添加新荣誉</button>
      <button className="btn" type="submit" onClick={handleSaveHonor}>保存所有荣誉</button>
      <button className="btn" onClick={handleCancelHonor}>取消</button>
    </form>
  </div>
)}

      </div>
    </div>
  );
};

export default StudentHashBoard;
