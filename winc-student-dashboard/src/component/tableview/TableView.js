import React from 'react'
import {useParams} from 'react-router-dom'

import Nav from '../common/Nav'
import Footer from '../common/Footer'
import RenderTable from './RenderTable'

import {HOME_URL, STORE_LABEL} from '../../Config'

const Tableview = props => {
    const params = useParams()
    const {
        getStudentNames,
        students,
        handleTableviewSelect,
        tableViewStudent
    } = props

    let student = ''
    let studentNames = getStudentNames()
    if (tableViewStudent !== '') {
        student = studentNames.find(student => {
            return student.username === tableViewStudent.toLowerCase()
        })
    } else if (params.username !== undefined) {
        student = studentNames.find(student => {
            return student.username === params.username
        })
    }
    if (student === undefined) {
        student = studentNames[0]
    }

    let studentData = students.filter(row => {
        return student.username === row.username.toLowerCase()
    })

    let urlToStudent = ''
    if (student !== undefined) {
        urlToStudent = (
            <li>
                <a
                    href={`${HOME_URL}/id/${student.id}/username/${student.username}`}
                >
                    {student.name}
                </a>
            </li>
        )
    }
    return (
        <React.Fragment>
            <Nav nav='DataTable' urlToStudent={urlToStudent} />
            <main>
                <header>
                    <h1>{STORE_LABEL}</h1>
                </header>
                <RenderTable
                    student={student}
                    studentNames={studentNames}
                    studentData={studentData}
                    handleTableviewSelect={handleTableviewSelect}
                />
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Tableview
