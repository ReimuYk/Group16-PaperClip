package com.paperclip.service;

import net.sf.json.JSONObject;

public interface DownloadService {
    //导出论文及该用户对应批注，返回文件uri
    String getExportPaperUri(JSONObject data);
}
