import { SdkPatcherRule } from '@wme-enhanced-sdk/sdk-patcher';
import EditingTransactionsHook from '@wme-enhanced-sdk/patch-editing--transactions';
import DataModelMapCommentsHook from '@wme-enhanced-sdk/patch-datamodel--mapcomments';
import DataModelPermanentHazardsHook from '@wme-enhanced-sdk/patch-datamodel--permanenthazards';

interface ListedHook {
  hook: SdkPatcherRule[];
  deps?: string[];
}

const allHooks: Record<string, ListedHook> = {
  'Editing.Transactions': { hook: EditingTransactionsHook },
  'DataModel.MapComments': { hook: DataModelMapCommentsHook },
  'DataModel.PermanentHazards': { hook: DataModelPermanentHazardsHook },
};

export default allHooks;
