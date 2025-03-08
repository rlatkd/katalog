"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TableOfContents({ contents }) {
  const [section, setSection] = useState(""); // 목차의 구역 설정
  const [scrolling, setScrolling] = useState(false); // 스크롤 상태 추적
  const pathname = usePathname();
  const headerHeight = 80; // 레이아웃 헤더의 높이

  useEffect(() => {
    const updateSection = () => {
      if (scrolling) return; // 스크롤 이벤트가 비활성화된 동안 동작 X
      let currentSection = ""; // 현재 구역

      contents.forEach(({ id }) => {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const scrollPosition = window.scrollY + headerHeight;

          if (scrollPosition >= sectionTop) {
            currentSection = id;
          }
        }
      });

      // 첫 번째 섹션보다 위로 올라가면 강조 제거
      const firstSection = contents[0];
      if (firstSection) {
        const firstSectionTop = document.getElementById(firstSection.id)?.offsetTop || 0;
        if (window.scrollY + headerHeight < firstSectionTop) {
          currentSection = "";
        }
      }

      // 마지막 섹션보다 아래로 내려가면 강조 제거
      const lastSection = contents[contents.length - 1];
      if (lastSection) {
        const lastSectionElement = document.getElementById(lastSection.id);
        if (lastSectionElement) {
          // 마지막 섹션의 끝 위치 계산 (섹션의 시작 위치 + 섹션의 높이)
          const lastSectionBottom = lastSectionElement.offsetTop + lastSectionElement.offsetHeight;
          
          // 현재 스크롤 위치가 마지막 섹션의 끝 위치보다 아래에 있는지 확인
          if (window.scrollY > lastSectionBottom) {
            currentSection = "";
          }
        }
      }

      setSection(currentSection);
    };

    window.addEventListener("scroll", updateSection);

    // 구역 변경 이벤트핸들러
    const handleSectionChange = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      setSection(hash);
    };

    window.addEventListener("hashchange", handleSectionChange);

    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("hashchange", handleSectionChange);
    };
  }, [contents, pathname, scrolling]);

  // 구역 클릭 이벤트핸들러
  const handleSectionClick = (id) => {
    setSection(id);
    window.location.hash = `#${id}`;

    // 클릭 후 바로 해당 구역으로 스크롤을 강제로 이동
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - headerHeight,
      });
    }

    setScrolling(true); // 클릭 후 스크롤 비활성화
    setTimeout(() => {
      setScrolling(false)}, 200);
  };

  return (
    <nav className="text-sm w-full border-l-2 border-gray-200">
      <ul className="ml-2 space-y-1">
        {contents.map(({ level, text, id }) => (
          <li key={id} className={`ml-${(level - 1) * 2}`}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick(id);
              }}
              className={`hover:underline transition-all duration-300 ${
                id === section ? "font-bold text-neutral-600 text-base" : "text-neutral-500 text-sm"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
