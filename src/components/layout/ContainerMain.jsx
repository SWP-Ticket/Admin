function ContainerMain({ children }) {
  return (
    <div className="bg-gray-100 container h-container-main  overscroll-y-auto	 overflow-y-scroll">
      {children}
    </div>
  );
}

export default ContainerMain;
