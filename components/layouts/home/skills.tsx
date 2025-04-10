'use client';

import { Code, Pencil, Sparkles } from 'lucide-react';

const skillItems = [
  {
    icon: <Code className='w-6 h-6 text-blue-400' />,
    title: '개발 & 기술',
    description: '최신 웹 기술과 프레임워크를 활용한 확장 가능한 솔루션 구축',
    gradient: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: <Pencil className='w-6 h-6 text-purple-400' />,
    title: '디자인 & UX',
    description: '사용자 중심의 직관적이고 접근성 높은 인터페이스 설계',
    gradient: 'from-purple-500/20 to-purple-600/20',
  },
  {
    icon: <Sparkles className='w-6 h-6 text-green-400' />,
    title: '혁신 & 창의성',
    description: '문제에 대한 창의적 접근과 지속적인 학습으로 혁신적 솔루션 제공',
    gradient: 'from-green-500/20 to-green-600/20',
  }
];

const SkillCard = ({ icon, title, description, gradient }) => {
  return (
    <div className='bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all group'>
      <div className={`mb-4 p-3 bg-gradient-to-r ${gradient} rounded-lg inline-block`}>
        {icon}
      </div>
      <h3 className='text-xl font-semibold mb-2 text-white/90 cursor-default'>{title}</h3>
      <p className='text-white/70 cursor-default'>{description}</p>
    </div>
  );
}

export default function Skills() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
      {skillItems.map((skill, index) => (
        <SkillCard 
          key={index}
          icon={skill.icon}
          title={skill.title}
          description={skill.description}
          gradient={skill.gradient}
        />
      ))}
    </div>
  );
}
