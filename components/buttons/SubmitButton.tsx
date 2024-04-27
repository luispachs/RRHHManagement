'use client';

export default function SubmitButton(params:{label:string;}){

    return (
        <button type="submit"  title={params.label}>{params.label}</button>
    );
}