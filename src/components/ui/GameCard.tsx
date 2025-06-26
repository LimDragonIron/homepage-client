/**
 * GameCard
 * ----------------------------------------------------------------------------
 * 게임 정보를 카드 형태로 보여주는 컴포넌트입니다.
 * - 썸네일 이미지, 게임 제목을 표시합니다.
 * - 클릭시 onClick 핸들러를 실행합니다.
 *
 * @param {object} props
 * @param {string} props.title - 게임 제목
 * @param {string} [props.image] - 썸네일 이미지 URL (옵션)
 * @param {number} props.width - 카드 가로 크기(px)
 * @param {number} props.height - 카드 세로 크기(px)
 * @param {() => void} [props.onClick] - 카드 클릭 핸들러 (옵션)
 *
 * @example
 * <GameCard title="GTA6" image="..." width={200} height={300} onClick={...} />
 */
type Props = {
  title: string;
  image?: string;
  content?: string;
  width: number;
  height: number;
  onClick?: () => void;
};

export default function GameCard({
  title,
  image,
  width,
  height,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl shadow bg-white flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:shadow-lg transition"
      style={{ width, height }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-[70%] object-cover"
          style={{ minHeight: 0 }}
        />
      )}
      <div
        className={`
          w-full text-center px-2 py-2
          font-bold
          text-sm xs:text-base md:text-lg
          text-[#181818]
          leading-tight
          line-clamp-2
          min-h-[2.5em]
          flex-shrink-0
        `}
        style={{
          wordBreak: "keep-all",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden"
        }}
        title={title}
      >
        {title}
      </div>
    </div>
  );
}