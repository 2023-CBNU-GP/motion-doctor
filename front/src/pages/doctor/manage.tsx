import Layout from "@md/components/layout";
import Head from "next/head";
import Navigation from "@md/components/navigation";
import { ManagePatients, RegisterTrain } from "@md/interfaces/manage.interface";
import { DoctorInfo } from "@md/interfaces/user.interface";
import Profile from "@md/components/profile";
import { useState } from "react";
import ManageItem from "@md/components/manageItem";

export async function getStaticProps() {
    const resManages = await fetch("http://localhost:3000" + "/api/get-manages");
    const manageData = await resManages.json();

    const resPatientNum = await fetch("http://localhost:3000" + "/api/get-doctor-patient-num");
    const patientNumData = await resPatientNum.json();

    const resRegisterTrain = await fetch("http://localhost:3000" + "/api/get-train-list");
    const registerTrainData = await resRegisterTrain.json();

    const resDoctor = await fetch("http://localhost:3000" + "/api/get-doctor");
    const doctorData = await resDoctor.json();

    return {props: {manageData, doctorData, patientNumData, registerTrainData}};
}

// 의사가 진료하는 환자들을 확인할 수 있는 페이지
export default function Manage({manageData, doctorData, patientNumData, registerTrainData}: {
    manageData: ManagePatients[] | null,
    doctorData: DoctorInfo,
    patientNumData: DoctorInfo,
    registerTrainData: RegisterTrain[] | null,
}) {
    const [tabIdx, setTabIdx] = useState(0);
    return (
        <div>
            <Head>
                <title>모션 닥터 | 의사 환자 관리페이지</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navigation></Navigation>

            {
                tabIdx === 0 ?
                    <Profile doctorData={doctorData} patientNumData={null} registerTrain={registerTrainData}/> :
                    <Profile doctorData={doctorData} patientNumData={patientNumData} registerTrain={null}/>
            }

            <Layout>

                <div
                    className="flex mb-8 gap-6 w-full pb-3 border-b-[1px] border-gray-300 justify-center drop-shadow-2xl">
                    <div className={`${tabIdx === 0 && "font-bold"} hover:font-bold`} onClick={() => setTabIdx(0)}>등록 재활
                        코스 목록
                    </div>
                    <div className={`${tabIdx === 1 && "font-bold"} hover:font-bold`} onClick={() => setTabIdx(1)}>진찰 환자
                        목록
                    </div>
                </div>

                {
                    tabIdx === 0 ? <ManageItem manageData={null} registerTrainData={registerTrainData}/> :
                        <ManageItem manageData={manageData} registerTrainData={null}/>
                }
            </Layout>
        </div>
    );
};