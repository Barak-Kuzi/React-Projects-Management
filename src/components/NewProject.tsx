import React, {useContext, useRef} from "react";
import Input from "./Input";
import Modal from "./Modal"
import {ProjectContext, StringOrUndefined} from "../store/ProjectContext";

export default function NewProject(): React.JSX.Element {
    const {onStartNewProject, onCancelClicked} = useContext(ProjectContext)

    const modal: React.MutableRefObject<HTMLDialogElement | any> = useRef();

    const titleRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
    const descriptionRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
    const dueDateRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

    function handleSaveButton() {
        const enteredTitle: StringOrUndefined = titleRef.current?.value;
        const enteredDescription: StringOrUndefined = descriptionRef.current?.value;
        const enteredDueDate: StringOrUndefined = dueDateRef.current?.value;

        if (enteredTitle?.trim() === '' ||
            enteredDescription?.trim() === '' ||
            enteredDueDate?.trim() === '') {
            modal.current?.open();
            return;
        }

        onStartNewProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="mb-4 text-stone-600">Oops... looks like you forgot to enter a value.</p>
                <p className="mb-4 text-stone-600">Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancelClicked}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSaveButton}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" label="Ttile" ref={titleRef}/>
                    <Input textarea label="Description" ref={descriptionRef}/>
                    <Input type="date" label="Due Date" ref={dueDateRef}/>
                </div>
            </div>
        </>
    );
}