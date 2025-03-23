import { SdkPatcherRule } from '@wme-enhanced-sdk/sdk-patcher';
import EditingTransactionsHook from '@wme-enhanced-sdk/patch-editing--transactions';
import DataModelMapCommentsHook from '@wme-enhanced-sdk/patch-datamodel--mapcomments';

interface ListedHook {
  hook: SdkPatcherRule[];
  deps?: string[];
}

const allHooks: Record<string, ListedHook> = {
  'Editing.Transactions': { hook: EditingTransactionsHook },
  'DataModel.MapComments': { hook: DataModelMapCommentsHook },
};

export default allHooks;
