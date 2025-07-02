import { useEffect, useState } from "react";
import { fetchCompany } from "@/api";
import type { Company } from "@/types/company";

/**
 * Footer
 * ----------------------------------------------------------------------------
 * 서버에서 회사 정보를 받아 동적으로 표시하는 푸터 컴포넌트입니다.
 */
export function Footer() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompany()
      .then(setCompany)
      .catch(() => setCompany(null));
  }, []);

  return (
    <footer
      id="company"
      className="w-full bg-[#fffdfa] border-t-4 border-black py-4 xs:py-8 mt-10 flex flex-col items-center gap-2 comic-panel"
    >
      <div className="font-extrabold text-blue-900 text-base xs:text-lg comic-title">
        {company?.name || "회사명"}
      </div>
      <div className="text-gray-500 text-xs xs:text-sm text-center font-comic">
        {company?.address
          ? (
              <>
                {company.postalCode && <>({company.postalCode}) </>}
                {company.address}
                {company.addressDetail && <> {company.addressDetail}</>}
              </>
            )
          : "주소를 입력해주세요."
        }
      </div>
      {(company?.phone || company?.email) && (
        <div className="text-gray-400 text-xs xs:text-sm font-comic">
          {company.phone && <>Tel: {company.phone}</>}
          {company.phone && company.email && " | "}
          {company.email && <>Email: {company.email}</>}
        </div>
      )}
      <div className="text-gray-400 text-[10px] xs:text-xs font-comic">
        &copy; {new Date().getFullYear()} {company?.name || "회사명"}. All rights reserved.
      </div>
    </footer>
  );
}