import React from "react";
import styles from './ContainerTemp.module.css'

export default function ContainerTemp({children}){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )

}