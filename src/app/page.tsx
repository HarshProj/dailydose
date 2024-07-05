import  {Navbar}  from "./Components/Navbar";
export default function Home() {
  return (
    <>
    <div className='flex w-full h-full flex-col items-center '>
    <Navbar/>
    <div className="w-[60%] h-full flex-col flex ">
    <div className="ml-3 w-full h-full mt-5">
      <div className="w-full h-10">User</div>
      <div className="w-full h-28">Content</div>
      <div className="h-12">
        likes
      </div>
    </div>
    <div className="ml-3 w-full h-full mt-5">
      <div className="w-full h-10">User</div>
      <div className="w-full h-28">Content</div>
      <div className="h-12">
        likes
      </div>
    </div>
    <div className="ml-3 w-full h-full mt-5">
      <div className="w-full h-10">User</div>
      <div className="w-full h-28">Content</div>
      <div className="h-12">
        likes
      </div>
    </div>
    </div>
    </div>
    </>
  );
}
