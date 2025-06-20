.icon {
  width: 36px;
  text-align: center;
  font-size: 1.2rem;
  margin-right: 8px;
  padding-top: 4px;
  color: #148fcb;
}



.pi-file-pdf {
  color: #e74c3c;
}
.pi-file-excel {
  color: #27ae60;
}
.pi-file-word {
  color: #2980b9;
}




<div className={styles.row}>
  <div className={`${styles.icon} pi pi-user`} />
  <div className={styles.bubble}>{msg.prompt}</div>
</div>

{msg.source && (
  <div className={styles.row}>
    <div className={`${styles.icon} pi ${getPrimeIcon(msg.source.type)}`} />
    <div className={styles.sourceBubble}>
      {msg.source.name} ({msg.source.type.toUpperCase()})
    </div>
  </div>
)}

<div className={styles.row}>
  <div className={`${styles.icon} pi pi-robot`} />
  <div className={styles.bubble}>
    {msg.response?.trim() ? (
      <div
        className={styles.aiText}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(msg.response)),
        }}
      />
    ) : (
      <div className={styles.emptyResponse}>
        No response generated
        <span className={styles.dots}><span>.</span><span>.</span><span>.</span></span>
      </div>
    )}
  </div>
</div>
