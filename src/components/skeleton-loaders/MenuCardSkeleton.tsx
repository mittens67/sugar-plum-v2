function MenuCardSkeletion({key} : Prop) {
  return (
    <div
      key={key}
      className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center animate-pulse"
    >
      <div className="w-40 h-40 bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  );
}


interface Prop {
    key: number;
}

export default MenuCardSkeletion;
