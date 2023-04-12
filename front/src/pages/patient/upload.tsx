import Layout from "@md/components/layout";
import Head from "next/head";
import Navigation from "@md/components/navigation";
import Item, { UploadItem } from "@md/components/upload/item";
import { useEffect, useRef, useState } from "react";

export default function Upload () {
    const [item, setItem] = useState({} as UploadItem);
    const [items, setItems] = useState([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const nextId = useRef(0);

    const handleSubmit = () => {
        const data : UploadItem = {
            id: nextId.current,
            name: "어깨운동",
            filePath: inputRef.current?.value,
        };
        setItems([data]);
        nextId.current += 1;
        setItem({name: "", filePath: ""});
        inputRef.current.value = null;
    };

    const handleRemove = (id) => {
        setItems(items.filter(idx => idx.id !== id));
    }

    const handleInputChange = (e) => {
        if (e.target.name === "filePath") setItem({ ...item, [e.target.name]: inputRef.current?.value });
        else setItem({ ...item, [e.target.name]: e.target.value });
    };


    return(
        <div>
            <Head>
                <title>모션 닥터 | 환자 자세 등록</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation></Navigation>

            <Layout>
                <div className="flex flex-col gap-2 my-10">
                    <div className="font-bold text-xl"><label className="">송수영 환자님</label>의 자세 등록</div>
                    <div className="font-semibold text-stone-400"><label>삼성병원 오지우</label> 님의 운동</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 border border-stone-100 p-2">
                        <div className="w-[20%] font-bold text-center">어깨 운동</div>
                        <input  className="w-[60%] file:mr-3 file:font-semibold file:bg-color-primary-400 file:rounded-sm file:text-white file:border-0"
                                name={"filePath"}
                                type={"file"}
                                ref={inputRef}
                                onChange={handleInputChange}/>
                        <button className="w-[20%] text-center bg-stone-500" onClick={handleSubmit}>등록하기</button>
                    </div>

                    <div>
                        {
                            items.map((idx) => {return <Item key={idx.id} itemData={idx} handleRemove={handleRemove}/>})
                        }
                    </div>

                    <div className="flex justify-end p-1">
                        <button
                                className="w-[20%] border border-stone-400 rounded-sm py-1 px-3 hover:bg-stone-400 hover:text-white">제출하기</button>
                    </div>
                </div>


            </Layout>
        </div>
    );
};