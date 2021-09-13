import { Extend } from "../../extend";
import tpl from "../../tpl";
import { promises as Fs } from "fs";
import { File, Folder } from "../../information";

Extend.ReadFile["sjs"] = async (path: string, info: Folder) => {
    Extend.Front_matter(await Fs.readFile(path, "utf-8"));
}

Extend.Template.render_register("sjs", "html", async (value: { path?: string, text?: string }, data: object): Promise<string> => {
    if (value.path === undefined && value.text === undefined) {
        throw new Error("path and text is null");
    }

    if (value.text === undefined) {
        return tpl(await Fs.readFile(value.path || "", "utf-8"), data);
    }
    else {
        return tpl(value.text, data, value.path || "");
    }
})

