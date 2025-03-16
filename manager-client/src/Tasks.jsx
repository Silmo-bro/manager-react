import { useState } from "react"
import axios from 'axios'

function Tasks({ Tasks }) {

    return (
        <div>
            <h2>All Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Date created</th>
                        <th>Date due</th>
                        <th>Status</th>
                        <th>Status date</th>
                        <th>Delegate</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Tasks