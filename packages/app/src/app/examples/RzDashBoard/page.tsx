'use client'; // Ensure this is a client component
import React, { useState, useEffect } from 'react';
import './RzDashBoard.css'; // 引入 RzDashBoard.css 文件

interface AgencyInfo {
  name: string;
  website: string;
  contact: string;
}
interface EducationRecord {
    id: string;
    studentName: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
    documentsUrl: string; // URL to supporting documents
  }
  
  interface WorkExperience {
    id: string;
    employeeName: string;
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    documentsUrl: string; // URL to supporting documents
  }
  
  interface CertificateRecord {
    id: string;
    studentName: string;
    certificateName: string;
    issuingBody: string;
    issueDate: string;
    expiryDate?: string;
    documentsUrl: string; // URL to supporting documents
  }

  interface HonorRecord {
    id: string;
    studentName: string;
    honorName: string;
    issuingOrganization: string;
    awardDate: string;
    documentsUrl: string; // URL to supporting documents
  }
  
  
const RzDashBoard: React.FC = () => {
  // 假设 agencyName 来自登录信息
  const [agencyName, setAgencyName] = useState('');

  // 假设登录信息以某种方式获取
  useEffect(() => {
    // 模拟从认证服务获取登录的账号名
    fetchAgencyName();
  }, []);

  const fetchAgencyName = async () => {
    // 这里是模拟请求，实际上你可能需要从后端服务获取
    const fetchedAgencyName = '登录的认证机构名';
    setAgencyName(fetchedAgencyName);
  };
  // Existing states and logic
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<EducationRecord | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [verificationComment, setVerificationComment] = useState<string>('');
  const [verificationDocument, setVerificationDocument] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState('');
 // State for handling work experiences
const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);
 // State for handling certificates
const [certificateRecords, setCertificateRecords] = useState<CertificateRecord[]>([]);
const [selectedCertificate, setSelectedCertificate] = useState<CertificateRecord | null>(null);
 // State for handling honors
 const [honorRecords, setHonorRecords] = useState<HonorRecord[]>([]);
 const [selectedHonor, setSelectedHonor] = useState<HonorRecord | null>(null);


  
  // Mock data fetching
  useEffect(() => {
    fetchEducationRecords();
  }, []);

  // Fetch work experiences (similar to education records)
useEffect(() => {
    fetchWorkExperiences();
  }, []);

  // Fetch certificate data
  useEffect(() => {
    fetchCertificateRecords();
  }, []);

  // Fetch honor data
  useEffect(() => {
    fetchHonorRecords();
  }, []);
  
  //教育经历详细信息
  const fetchEducationRecords = async () => {
    const fetchedRecords: EducationRecord[] = [
      {
        id: '1',
        studentName: 'John Doe',
        institution: 'University of Somewhere',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        graduationYear: '2020',
        documentsUrl: 'http://example.com/documents/john_doe.pdf',
      },
      // Add more records as needed
    ];
    setEducationRecords(fetchedRecords);
  };

  const fetchWorkExperiences = async () => {
    const fetchedExperiences: WorkExperience[] = [
      {
        id: '1',
        employeeName: 'Jane Doe',
        companyName: 'Tech Solutions',
        role: 'Senior Developer',
        startDate: '2018-03',
        endDate: '2022-08',
        description: 'Led the development team for creating scalable web solutions.',
        documentsUrl: 'http://example.com/work_documents/jane_doe.pdf',
      },
      // Additional records can be added here
    ];
    setWorkExperiences(fetchedExperiences);
  };

  const fetchCertificateRecords = async () => {
    const fetchedCertificates: CertificateRecord[] = [
      {
        id: '1',
        studentName: 'Alice Johnson',
        certificateName: 'Certified Network Engineer',
        issuingBody: 'Tech Certification Institute',
        issueDate: '2019-06',
        expiryDate: '2024-06',
        documentsUrl: 'http://example.com/certificates/alice_johnson.pdf',
      },
      // More records can be added here
    ];
    setCertificateRecords(fetchedCertificates);
  };

  const handleSelectCertificate = (record: CertificateRecord) => {
    setSelectedCertificate(record);
  };
  const fetchHonorRecords = async () => {
    const fetchedHonors: HonorRecord[] = [
      {
        id: '1',
        studentName: 'John Doe',
        honorName: 'Best Innovator Award',
        issuingOrganization: 'Innovation Hub',
        awardDate: '2021-07',
        documentsUrl: 'http://example.com/documents/john_award.pdf',
      },
      // More records can be added here
    ];
    setHonorRecords(fetchedHonors);
  };

  const handleSelectHonor = (record: HonorRecord) => {
    setSelectedHonor(record);
  };

  // Handling submission of verification for a selected honor
  const handleSubmithonorVerification = () => {
    if (selectedHonor) {
      console.log({
        honorId: selectedHonor.id,
        verificationStatus: verificationStatus,
        verificationComment: verificationComment,
      });
      alert('Verification submitted for honor: ' + selectedHonor.honorName);
      setSelectedHonor(null); // Optionally reset the selected honor
    }
  };
  // Submitting the verification for a certificate
  const handleSubmitCertificateVerification = () => {
    if (selectedCertificate) {
      console.log({
        certificateId: selectedCertificate.id,
        verificationStatus: verificationStatus,
        verificationComment: verificationComment,
      });
      alert('Verification submitted for certificate: ' + selectedCertificate.certificateName);
      setSelectedCertificate(null); // Optionally reset the selected certificate
    }
  };

  const handleSelectRecord = (record: EducationRecord) => {
    setSelectedRecord(record);
    setVerificationStatus('');
    setVerificationComment('');
  };

  // Select a work experience to view and verify
const handleSelectExperience = (experience: WorkExperience) => {
    setSelectedExperience(experience);
    setVerificationStatus('');
    setVerificationComment('');
  };

  const handleSubmitVerification = () => {
    if (selectedRecord) {
      const formData = new FormData();
      if (verificationDocument) {
        formData.append('verificationDocument', verificationDocument);
      }
      formData.append('verificationStatus', verificationStatus);
      formData.append('verificationComment', verificationComment);

      console.log('Submitting verification...');
      // Here you would typically make a POST request to your backend
      // Example: axios.post('api/verify', formData);

      alert('Verification submitted for: ' + selectedRecord.studentName);
      // Reset form state after submission
      setSelectedRecord(null);
      setVerificationStatus('');
      setVerificationComment('');
      setVerificationDocument(null);
    }
  };

  const [agencyInfo, setAgencyInfo] = useState<AgencyInfo>({
    name: '',
    website: '',
    contact: '',
  });
  const [isAddingInfo, setIsAddingInfo] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const handleSaveInfo = () => {
    setIsAddingInfo(false);
    setIsEditingInfo(false);
  };

  const handleCancelInfo = () => {
    setIsAddingInfo(false);
    setIsEditingInfo(false);
  };

  const handleEditInfo = () => {
    setIsEditingInfo(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVerificationDocument(event.target.files[0]);
    }
  };
  
  const handleCompleteVerification = () => {
     // 假设这是调用API提交审核信息的模拟
     const result = '通过'; // 模拟API返回的审核结果
     setVerificationResult(result); // 更新状态以反映审核结果
  };

  

  
  return (
    <div className="loginBox">
      <h1>{agencyName}</h1>
      <div>
        <h2>机构信息</h2>
        {!isAddingInfo && !isEditingInfo && (
          <div>
            <p>机构名称: {agencyInfo.name}</p>
            <p>机构网站: {agencyInfo.website}</p>
            <p>联系电话或邮箱: {agencyInfo.contact}</p>
            <button className="btn" onClick={handleEditInfo}>编辑</button>
          </div>
        )}
        {isEditingInfo && (
          <div>
            <form>
              <div className="item">
                <input
                  type="text"
                  placeholder="机构名称"
                  value={agencyInfo.name}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, name: e.target.value })}
                />
              </div>
              <div className="item">
                <input
                  type="text"
                  placeholder="机构网站"
                  value={agencyInfo.website}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, website: e.target.value })}
                />
              </div>
              <div className="item">
                <input
                  type="text"
                  placeholder="联系电话或邮箱"
                  value={agencyInfo.contact}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, contact: e.target.value })}
                />
              </div>
              <button className="btn" type="button" onClick={handleSaveInfo}>保存</button>
              <button className="btn" type="button" onClick={handleCancelInfo}>取消</button>
            </form>
          </div>
        )}
      </div>
          
      <div>
        <h2>审核教育背景</h2>
        {educationRecords.map((record) => (
          <div key={record.id} className="item">
            <p>{`${record.studentName} - ${record.institution}`}</p>
            <button className="btn" onClick={() => handleSelectRecord(record)}>查看详情</button>
          </div>
        ))}
        
        {selectedRecord && (
          <div>
              <h2 className="h2-button-style">详细信息: {selectedRecord.studentName}</h2>
            <p>机构: {selectedRecord.institution}</p>
            <p>学位: {selectedRecord.degree}</p>
            <p>专业: {selectedRecord.fieldOfStudy}</p>
            <p>毕业年份: {selectedRecord.graduationYear}</p>
            <a href={selectedRecord.documentsUrl} target="_blank">查看证明材料</a>

            <h2 className="h2-button-style">审核机构</h2>
    
            <div>
              <label>上传证明材料：</label>
              <input type="file" onChange={handleFileChange} />
              {verificationDocument && <p>已选择文件: {verificationDocument.name}</p>}
              <label>审核状态：</label>
              <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
                <option value="">选择状态</option>
                <option value="approved">通过</option>
                <option value="rejected">不通过</option>
              </select>
              <div className="item">
                <input
                  type="text"
                  placeholder="添加审核意见" 
                value={verificationComment} 
                onChange={(e) => setVerificationComment(e.target.value)}
                />
              </div>
              <button className="btn" onClick={handleCompleteVerification}>提交审核</button>
              {verificationResult && <p>审核结果: {verificationResult}</p>}
            </div>
          </div>
        )}
      </div>
      <div>
  <h2>审核工作经历</h2>
  {workExperiences.map((experience) => (
    <div key={experience.id} className="item">
      <p>{`${experience.employeeName} - ${experience.companyName}`}</p>
      <button className="btn" onClick={() => handleSelectExperience(experience)}>查看详情</button>
    </div>
  ))}

  {selectedExperience && (
    <div>
      <h2 className="h2-button-style">详细信息: {selectedExperience.employeeName}</h2>
      <p>公司: {selectedExperience.companyName}</p>
      <p>职位: {selectedExperience.role}</p>
      <p>描述: {selectedExperience.description}</p>
      <a href={selectedExperience.documentsUrl} target="_blank">查看证明材料</a>
      <h2 className="h2-button-style">审核机构</h2>
      <div>
      <label>上传证明材料：</label>
              <input type="file" onChange={handleFileChange} />
              {verificationDocument && <p>已选择文件: {verificationDocument.name}</p>}
        <label>审核状态：</label>
        <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
          <option value="">选择状态</option>
          <option value="approved">通过</option>
          <option value="rejected">不通过</option>
        </select>
        <div className="item">
                <input
                  type="text"
                  placeholder="添加审核意见" 
                value={verificationComment} 
                onChange={(e) => setVerificationComment(e.target.value)}
                />
              </div>
              <button className="btn" onClick={handleCompleteVerification}>提交审核</button>
              {verificationResult && <p>审核结果: {verificationResult}</p>}
      </div>
    </div>
  )}
</div>
<div>
      <h2>审核证书执照</h2>
      {certificateRecords.map((record) => (
        <div key={record.id} className="item">
          <p>{`${record.studentName} - ${record.certificateName}`}</p>
          <button className="btn" onClick={() => handleSelectCertificate(record)}>查看详情</button>
        </div>
      ))}

      {selectedCertificate && (
        <div>
             <h2 className="h2-button-style">详细信息</h2>
          <p>证书名称: {selectedCertificate.certificateName}</p>
          <p>发行机构: {selectedCertificate.issuingBody}</p>
          <p>发行日期: {selectedCertificate.issueDate}</p>
          <p>到期日期: {selectedCertificate.expiryDate}</p>
          <a href={selectedCertificate.documentsUrl} target="_blank">查看证明材料</a>
          {/* Form for verification status and comment */}
          <h2 className="h2-button-style">审核机构</h2>
          <div>
      <label>上传证明材料：</label>
              <input type="file" onChange={handleFileChange} />
              {verificationDocument && <p>已选择文件: {verificationDocument.name}</p>}
        <label>审核状态：</label>
        <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
          <option value="">选择状态</option>
          <option value="approved">通过</option>
          <option value="rejected">不通过</option>
        </select>
        <div className="item">
                <input
                  type="text"
                  placeholder="添加审核意见" 
                value={verificationComment} 
                onChange={(e) => setVerificationComment(e.target.value)}
                />
              </div>
              <button className="btn" onClick={handleCompleteVerification}>提交审核</button>
              {verificationResult && <p>审核结果: {verificationResult}</p>}
      </div>
        </div>
      )}
    </div>
    <div>
      <h2>审核荣誉奖项</h2>
      {honorRecords.map((record) => (
        <div key={record.id}>
          <p>{`${record.studentName} - ${record.honorName}`}</p>
          <button className="btn" onClick={() => handleSelectHonor(record)}>查看详情</button>
        </div>
      ))}

      {selectedHonor && (
        <div>
              <h2 className="h2-button-style">详细信息</h2>
          <p>奖项名称: {selectedHonor.honorName}</p>
          <p>颁发机构: {selectedHonor.issuingOrganization}</p>
          <p>颁奖日期: {selectedHonor.awardDate}</p>
          <a href={selectedHonor.documentsUrl} target="_blank">查看证明材料</a>
          <h2 className="h2-button-style">审核机构</h2>
          <div>
      <label>上传证明材料：</label>
              <input type="file" onChange={handleFileChange} />
              {verificationDocument && <p>已选择文件: {verificationDocument.name}</p>}
        <label>审核状态：</label>
        <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)}>
          <option value="">选择状态</option>
          <option value="approved">通过</option>
          <option value="rejected">不通过</option>
        </select>
        <div className="item">
                <input
                  type="text"
                  placeholder="添加审核意见" 
                value={verificationComment} 
                onChange={(e) => setVerificationComment(e.target.value)}
                />
              </div>
              <button className="btn" onClick={handleCompleteVerification}>提交审核</button>
              {verificationResult && <p>审核结果: {verificationResult}</p>}
      </div>
        </div>
      )}
    </div>
    </div>
  );
};
   
export default RzDashBoard;

